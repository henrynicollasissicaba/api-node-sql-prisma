import { Handler } from "express";
import { CreateCampaignRequestSquema, UpdateCampaignRequestSquema } from "./schemas/CampaignRequestSchema";
import { CampaignsRepository } from "../repositories/CampaignsRepository";

export class CampaignsController {
    constructor(private readonly campaignsRepository: CampaignsRepository){}

    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await this.campaignsRepository.find()

            res.json(campaigns)
        } catch (error) {
            next(error)
        }
    }

    createCampaign: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignRequestSquema.parse(req.body)
            const newCampaign = await this.campaignsRepository.create(body)

            res.status(201).json(newCampaign)
        } catch (error) {
            next(error)
        }
    }

    findSingleCampaign: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const campaign = await this.campaignsRepository.findById(id)

            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    updateCampaign: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const body = UpdateCampaignRequestSquema.parse(req.body)

            const updatedCampaign = await this.campaignsRepository.updateById(id, body)

            res.json(updatedCampaign)
        } catch (error) {
            next(error)
        }
    }

    deleteCampaign: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const deletedCampaign = await this.campaignsRepository.deleteById(id)

            res.json(deletedCampaign)
        } catch (error) {
            next(error)
        }
    }
}