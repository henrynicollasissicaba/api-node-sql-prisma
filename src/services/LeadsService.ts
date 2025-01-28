import { HttpError } from "../errors/HttpError";
import {
  CreateLeadAttributes,
  LeadsRepository,
  LeadStatus,
  LeadWhereParams,
} from "../repositories/LeadsRepository";

interface GetLeadsWithPaginationParams {
  page?: number;
  pageSize?: number;
  name?: string;
  status?: LeadStatus;
  sortBy?: "name" | "status" | "createdAt";
  order?: "asc" | "desc";
}

export class LeadsService {
  constructor(private readonly leadsRepository: LeadsRepository) {}

  async getAllLeadsPaginated(attributes: GetLeadsWithPaginationParams) {
    const { name, status, page = 1, pageSize = 10, sortBy, order } = attributes;
    const limit = pageSize;
    const offset = (page - 1) * limit;

    const where: LeadWhereParams = {};

    if (name) where.name = { like: name, mode: "insensitive" };
    if (status) where.status = status;

    const leads = await this.leadsRepository.find({
      whereParam: where,
      limit: limit,
      offset: offset,
      sortBy: sortBy,
      order: order,
    });
    const total = await this.leadsRepository.count(where);

    return {
      leads,
      meta: {
        page: page,
        pageSize: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getLeadById(leadId: number) {
    const lead = await this.leadsRepository.findById(leadId);
    if (!lead) throw new HttpError(404, "Lead not found!");

    return lead;
  }

  async createLead(attributes: CreateLeadAttributes) {
    const lead = await this.leadsRepository.create(attributes);
    return lead;
  }

  async updateLead(leadId: number, attributes: Partial<CreateLeadAttributes>) {
    const lead = await this.leadsRepository.findById(leadId);

    if (!lead) throw new HttpError(404, "Lead not found!");

    if (lead.status === "New" && attributes.status !== undefined && attributes.status !== "Contacted"){
        throw new HttpError(400, "A New lead must be contacted before being updated to other values!")
    }

    if (attributes.status && attributes.status === "Archived") {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 180)
        throw new HttpError(
          400,
          "Leads that are less than 180 days old and have not been updated cannot be archived!"
        );
    }

    const updatedLead = await this.leadsRepository.updateById(leadId, attributes);

    return updatedLead
  }

  async deleteLead(leadId: number){
    const lead = await this.leadsRepository.findById(leadId)

    if(!lead) throw new HttpError(404, "Lead not found!")

    const deletedLead = await this.leadsRepository.deleteById(leadId)
    
    return deletedLead
  }
}
