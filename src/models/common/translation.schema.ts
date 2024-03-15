import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false, timestamps: false })
export class Translation {
  @Prop({ type: String, default: 'en' })
  language?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description?: string;
}
