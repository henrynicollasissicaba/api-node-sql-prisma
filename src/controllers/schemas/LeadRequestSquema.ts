import { z } from "zod";

const LeadStatusSchema = z.enum([
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived",
])

export const GetLeadRequestSchema = z.object({
  // pagination
  page: z.string().optional(),
  // number of leads per page
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadStatusSchema.optional(),
  sortBy: z.enum(["name", "status"]).optional(),
  order: z.enum(["asc", "desc"]).optional()
})

export const CreateLeadRequestSquema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  status: LeadStatusSchema.optional(),
});

export const UpdateLeadRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  status: LeadStatusSchema.optional(),
})
