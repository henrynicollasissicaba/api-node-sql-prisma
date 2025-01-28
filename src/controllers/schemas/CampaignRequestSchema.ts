import { z } from "zod";

const LeadCampaignStatus = z.enum([
    "New",
    "Engaged",
    "FollowUp_Scheduled",
    "Contacted",
    "Qualified",
    "Converted",
    "Unresponsive",
    "Disqualified",
    "Re_Engaged",
    "Opted_Out"
])

export const CreateCampaignRequestSquema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional()
})

export const UpdateCampaignRequestSquema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
})

export const GetLeadCampaignRequestSchema = z.object({
    name: z.string().optional(),
    status: LeadCampaignStatus.optional()
})

export const AddLeadCampaignRequestSchema = z.object({
    leadId: z.number(),
    status: LeadCampaignStatus.optional()
})

export const UpdateLeadCampaignSchema = z.object({
    status: LeadCampaignStatus
})