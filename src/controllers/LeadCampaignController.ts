import { Handler } from "express";
import { AddLeadCampaignRequestSchema, GetLeadCampaignRequestSchema, UpdateLeadCampaignSchema } from "./schemas/CampaignRequestSchema";
import { CampaignsRepository } from "../repositories/CampaignsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

export class LeadCampaignController {
    constructor(
        private readonly campaignsRepository: CampaignsRepository,
        private readonly leadsRepository: LeadsRepository
    ){}

    getLeadsCampaign: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const { name, status } = GetLeadCampaignRequestSchema.parse(req.query)

            const where: LeadWhereParams = { campaignId, campaignStatus: status }

            if(name) where.name = { like: name, mode: "insensitive" }
            const leads = await this.leadsRepository.find({ whereParam: where })

            res.json(leads)
        } catch (error) {
            next(error)
        }
    }

    addLeadCampaign: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const { leadId, status = "New" } = AddLeadCampaignRequestSchema.parse(req.body)

            await this.campaignsRepository.addLeadToCampaign({ campaignId, leadId, status })

            res.status(201).end()
        } catch (error) {
            next(error)
        }
    }

    updateLeadCampaign: Handler = async (req, res, next) => {
        try {
            const { status } = UpdateLeadCampaignSchema.parse(req.body)
            const leadId = +req.params.leadId
            const campaignId = +req.params.campaignId
            
            await this.campaignsRepository.updateLeadStatus({status, leadId, campaignId})

            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    deleteLeadCampaign: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const leadId = +req.params.leadId

            await this.campaignsRepository.removeLeadFromCampaign(leadId, campaignId)

            res.status(200).end()
        } catch (error) {
            next(error)
        }
    }
}