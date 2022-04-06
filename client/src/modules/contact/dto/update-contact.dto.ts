import { ITag } from '@modules/tag/entity/tag.entity';
import { IContact } from '../entity/contact.entity';
export interface UpdateContactDto extends Partial<IContact> {}
export interface UpdateContactTagsDto extends Partial<ITag> {
  tagIds: string[]
}