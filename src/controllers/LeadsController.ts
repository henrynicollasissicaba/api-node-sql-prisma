import { Handler } from "express";
import { CreateLeadRequestSquema, GetLeadRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadRequestSquema";
import { LeadsService } from "../services/LeadsService";

export class LeadsController {
    constructor(private readonly leadsService: LeadsService){}

    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10" } = query

            const response = await this.leadsService.getAllLeadsPaginated({
                ...query,
                page: +page,
                pageSize: +pageSize
            })

            res.json(response)
        } catch (error) {
            next(error)
        }
    }

    createLead: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSquema.parse(req.body)
            const newLead = await this.leadsService.createLead(body)

            res.status(201).json(newLead)
        } catch (error) {
            next(error)
        }
    }

    getSingleLead: Handler = async (req, res, next) => {
        try {
            const leadId = +req.params.id
            const lead = await this.leadsService.getLeadById(leadId)

            res.json(lead)
        } catch (error) {
            next(error)
        }
    }

    updateLead: Handler = async (req, res, next) => {
        try {
            const leadId = Number(req.params.id)
            const body = UpdateLeadRequestSchema.parse(req.body)

            const updatedLead = await this.leadsService.updateLead(leadId, body)

            res.json(updatedLead)
        } catch (error) {
            next(error)
        }
    }

    deleteLead: Handler = async (req, res, next) => {
        try {
            const leadId = +req.params.id
            const deletedLead = await this.leadsService.deleteLead(leadId)

            res.json(deletedLead)
        } catch (error) {
            next(error)
        }
    }
}