import { Campaign } from "@prisma/client";
import { AddLeadToCampaignAttributes, CampaignsRepository, CreateCampaignAttributes } from "../CampaignsRepository";
import { prisma } from "../../database";

export class PrismaCampaignsRepository implements CampaignsRepository {
    async find(): Promise<Campaign[]>{
        return prisma.campaign.findMany()
    }
    async findById(id: number): Promise<Campaign | null>{
        return prisma.campaign.findUnique({
            where: { id: id },
            include: {
                leads: {
                    include: { lead: true }
                }
            }
        })
    }
    async create(attributes: CreateCampaignAttributes): Promise<Campaign>{
        return prisma.campaign.create({ data: attributes })
    }
    async updateById(id: number, attributes: Partial<CreateCampaignAttributes>): Promise<Campaign | null>{
        const campaignExists = await prisma.campaign.findUnique({ where: { id } })
        if (!campaignExists) return null

        return prisma.campaign.update({
            where: { id },
            data: attributes
        })
    }
    async deleteById(id: number): Promise<Campaign | null>{
        const campaignExists = await prisma.campaign.findUnique({ where: { id } })
        if (!campaignExists) return null

        return prisma.campaign.delete({ where: { id: id }})
    }

    async addLeadToCampaign(attributes: AddLeadToCampaignAttributes): Promise<void>{
        await prisma.leadCampaign.create({ data: attributes })
    }

    async updateLeadStatus(attributes: AddLeadToCampaignAttributes): Promise<void>{
        await prisma.leadCampaign.update({
            where: {
                leadId_campaignId: {
                    leadId: attributes.leadId,
                    campaignId: attributes.campaignId
                }
            },
            data: {
                status: attributes.status
            }
        })
    }

    async removeLeadFromCampaign(leadId: number, campaignId: number): Promise<void>{
        await prisma.leadCampaign.delete({
            where: {
                leadId_campaignId: { leadId: leadId, campaignId: campaignId }
            }
        })
    }
}