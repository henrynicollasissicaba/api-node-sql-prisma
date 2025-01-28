import { Campaign } from "@prisma/client";

export interface CreateCampaignAttributes {
    name: string
    description: string
    startDate: Date
    endDate?: Date
}

export type LeadCampaignStatus = "New" | "Engaged" | "FollowUp_Scheduled" | "Contacted" | "Qualified" | "Converted" | "Unresponsive" | "Disqualified" | "Re_Engaged" | "Opted_Out"

export interface AddLeadToCampaignAttributes {
    leadId: number
    campaignId: number
    status: LeadCampaignStatus
}

export interface CampaignsRepository {
    find: () => Promise<Campaign[]>
    findById: (id: number) => Promise<Campaign | null>
    create: (attributes: CreateCampaignAttributes) => Promise<Campaign>
    updateById: (id: number, attributes: Partial<CreateCampaignAttributes>) => Promise<Campaign | null>
    deleteById: (id: number) => Promise<Campaign | null>

    addLeadToCampaign: (attributes: AddLeadToCampaignAttributes) => Promise<void>
    updateLeadStatus: (attributes: AddLeadToCampaignAttributes) => Promise<void>
    removeLeadFromCampaign: (leadId: number, campaignId: number) => Promise<void>
}