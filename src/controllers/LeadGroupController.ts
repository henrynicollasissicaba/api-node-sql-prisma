import { Handler } from "express";
import { GetLeadRequestSchema } from "./schemas/LeadRequestSquema";
import { AddLeadGroupRequestSchema } from "./schemas/GroupRequestSchema";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

export class LeadGroupController {
    constructor(
        private readonly groupsRepository: GroupsRepository,
        private readonly leadsRepository: LeadsRepository
    ){}

    getLeadsGroup: Handler = async (req, res, next) => {
        try {
            const groupId = +req.params.groupId
            const query = GetLeadRequestSchema.parse(req.query)
            const { name, order = "asc", page = "1", pageSize = "10", sortBy = "name", status } = query

            const where: LeadWhereParams = { groupId }
            if(name) where.name = { like: name, mode: "insensitive" }
            if(status) where.status = status

            const limit = +pageSize
            const offset = (+page - 1) * limit

            const leads = await this.leadsRepository.find({
                whereParam: where,
                include: { groups: true },
                limit: limit,
                offset: offset,
                order: order, 
                sortBy: sortBy
            })

            const total = await this.leadsRepository.count(where)

            res.json({
                leads,
                meta: {
                  page: Number(page),
                  pageSize: limit,
                  total,
                  totalPages: Math.ceil(total / limit)
                }
            })

        } catch (error) {
            next(error)
        }
    }

    addLeadGroup: Handler = async (req, res, next) => {
        try {
            const { leadId } = AddLeadGroupRequestSchema.parse(req.body)
            const groupId = +req.params.groupId

            await this.groupsRepository.addLeadToGroup(leadId, groupId)

            res.status(201).end()
        } catch (error) {
            next(error)
        }
    }

    deleteLeadGroup: Handler = async (req, res, next) => {
        try {
            const leadId = +req.params.leadId
            const groupId = +req.params.groupId

            await this.groupsRepository.removeLeadFromGroup(leadId, groupId)

            res.status(200).end()   
        } catch (error) {
            next(error)
        }
    }
}