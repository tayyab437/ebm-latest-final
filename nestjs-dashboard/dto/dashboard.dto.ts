import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateWidgetOrderDto {
  @IsString()
  @IsNotEmpty()
  widgetId: string;

  @IsString()
  @IsNotEmpty()
  orderIndex: number;
}
