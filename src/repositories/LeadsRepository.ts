import { Lead } from "@prisma/client";
import { LeadCampaignStatus } from "./CampaignsRepository";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Unresponsive" | "Disqualified" | "Archived"

export interface LeadWhereParams {
    name?: {
        like?: string
        equals?: string
        mode?: "default" | "insensitive"
    },
    status?: LeadStatus
    campaignStatus?: LeadCampaignStatus
    groupId?: number
    campaignId?: number
}

export interface FindLeadsParams{
    whereParam?: LeadWhereParams
    sortBy?: "name" | "status" | "createdAt"
    order?: "asc" | "desc"
    limit?: number
    offset?: number
    include?: {
        groups?: boolean
        campaigns?: boolean
    }
}

export interface CreateLeadAttributes {
    name: string
    email: string
    phone: string
    status?: LeadStatus
}

export interface LeadsRepository {
    find: (params: FindLeadsParams) => Promise<Lead[]>
    findById: (id: number) => Promise<Lead | null>
    count: (where: LeadWhereParams) => Promise<number>
    create: (attributes: CreateLeadAttributes) => Promise<Lead>
    updateById: (id: number, attributes: Partial<CreateLeadAttributes>) => Promise<Lead>
    deleteById: (id: number) => Promise<Lead>
}