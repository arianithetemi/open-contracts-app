import { Installment } from './installment';
import { Annex } from './annex';

export interface Contract {
    activityTitle?: String;
    procurementNo?: Number;
    procurementType?: Number;
    procurementValue?: Number;
    procurementProcedure?: Number;
    fppClassification?: Number;
    planned?: Number;
    budget?: Number;
    initiationDate?: Date;
    approvalDateOfFunds?: Date;
    torDate?: Date;
    contractPublicationDate?: Date;
    complaintsToAuthority1?: Number;
    complaintsToOshp1?: Number;
    bidOpeningDateTime?: Date;
    contractNoOfDownloads?: Number;
    contractNoOfOffers?: Number;
    noOfOffersForContract?: Number;
    startingOfEvaluationDate?: Date;
    endingOfEvaluationDate?: Date;
    noOfRefusedBids?: Number;
    reapprovalDate?: Date;
    standardeDocumentsForOe?: Date;
    publicationDateOfGivenContract: Date;
    cancellationNoticeDate?: Date;
    complaintsToAuthority2?: Number;
    complaintsToOshp2?: Number;
    predictedContractValue?: Number;
    oeType?: Number;
    applicationDeadlineType?: Number;
    contractCriteria?: Number;
    retender?: String;
    status?: Number;
    nameOfContractedOe?: String;
    signingDate?: Date;
    contractImplementationDeadlineStartingDate?: Date;
    contractImplementationDeadlineEndingDate?: Date;
    contractClosingDate?: Date;
    noOfPaymentInstallments?: Date;
    totalAmountOfAllAnnexContractsIncludingTaxes?: String;
    annexes?: Annex[];
    installments?: Installment[];
    lastInstallmendPayDate?: Date;
    lastInstallmendAmount?: String;
    discountAmount: Number;
    totalAmount?: String;
    department?: String;
    contractFile?: String;
    nameOfProdcurementOffical?: String;
}
