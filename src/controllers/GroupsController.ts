import { Handler } from "express";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupRequestSchema";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { HttpError } from "../errors/HttpError";

export class GroupsController {
    // private groupsRepository: GroupsRepository

    // constructor(groupsRepository: GroupsRepository){
    //     this.groupsRepository = groupsRepository
    // }

    // ABREVIAÇÃO DO CONSTRUTOR ACIMA
    constructor(private readonly groupsRepository: GroupsRepository){}

    index: Handler = async (req, res, next) => {
        try {
            const groups = await this.groupsRepository.find()
            
            res.json(groups)
        } catch (error) {
            next(error)
        }
    }

    createGroup: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const newGroup = await this.groupsRepository.create(body)

            res.status(201).json(newGroup)
        } catch (error) {
            next(error)
        }
    }

    getSingleGroup: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const group = await this.groupsRepository.findById(id)

            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    updateGroup: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const body = UpdateGroupRequestSchema.parse(req.body)

            const updatedGroup = await this.groupsRepository.updateById(id, body)
            if(!updatedGroup) throw new HttpError(404, "Group not found!")

            res.json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }

    deleteGroup: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const deletedGroup = await this.groupsRepository.deleteById(id)
            if(!deletedGroup) throw new HttpError(404, "Group not found or can't be deleted!")

            res.json(deletedGroup)
        } catch (error) {
            next(error)
        }
    }
}