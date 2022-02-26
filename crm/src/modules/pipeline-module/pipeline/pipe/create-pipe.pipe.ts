import { Injectable, PipeTransform } from '@nestjs/common';
import { reIndexPipeline, sortPipeline } from 'src/util/pipeline';
import { CreatePipelineDto } from '../dto/create-pipeline.dto';

@Injectable()
export class CreatePipePipe implements PipeTransform {
  transform(value: CreatePipelineDto) {
    // !when receive pipeline payload from client, re-indexing them
    // TODO: first is to deeply sort the whole array, so that they can follow the order the client first want
    const sortedDto = sortPipeline(value);
    // TODO: after deeply sort the array, re-indexing them so they will start increasingly from 0,1,2,3...
    reIndexPipeline(sortedDto);

    return value;
  }
}
