import mongoose, { Document, Model, Schema, SchemaDefinition, SchemaOptions, Types } from 'mongoose';

enum CardType {
  Artifact = 'artifact',
  Creature = 'creature',
  Enchantment = 'enchantment',
  Land = 'land',
}

interface CardDb extends Document {
  _id: Types.ObjectId;
  type: CardType;
}

interface LandDb extends CardDb {
  type: CardType.Land;
}

const cardDbBaseSchemaDefinition: SchemaDefinition = {
  type: { type: String, required: true },
};

const cardDbSchemaOptions: SchemaOptions = { discriminatorKey: 'type' };

export const cardDbSchema: Schema = new Schema(
  cardDbBaseSchemaDefinition,
  cardDbSchemaOptions,
);

export const cardDbModel: Model<CardDb> = mongoose.model<CardDb>(
  'Card',
  cardDbSchema,
  'card',
);

const landDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {};

export const landDbSchema: Schema = new Schema(
  landDbAdditionalPropertiesSchemaDefinition,
);

export const landDbModel: Model<LandDb> = cardDbModel.discriminator<LandDb>(
  'Land',
  landDbSchema,
  CardType.Land,
);

const sampleLandDb: LandDb = new landDbModel({
   type: CardType.Land,
});

const sampleCardDb: CardDb = sampleLandDb;