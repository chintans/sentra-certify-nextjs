export interface SampleDto {
    id: string;
    assetLevel: string;
    docName: string;
    scopeLevel: string;
    frequency: string;
    activityData: number | null;
    emissionFactor: number | null;
    absoulute: number;
    intensity: number;
    fromDate: Date;
    toDate: Date;
    description: string | null;
  }

export interface SampleProofDto {
  sampleProofLink: string;
  sampleProofName: string;
}


export enum ProofCategory {
    ActivityData = 1,
    EmissionFactor = 2,
    Absolute = 3,
    Intensity = 4
}