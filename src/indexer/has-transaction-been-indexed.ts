import { apolloClient } from '../apollo-client';
import { explicitStart } from '../config';
import {
  DiGiTransactionStatusDocument,
  DiGiTransactionStatusRequest,
  DiGiTransactionStatusType,
} from '../graphql/generated';

const hasTxBeenIndexed = async (request: DiGiTransactionStatusRequest) => {
  const result = await apolloClient.query({
    query: DiGiTransactionStatusDocument,
    variables: {
      request,
    },
    fetchPolicy: 'network-only',
  });

  return result.data.digiTransactionStatus;
};

export const waitUntilComplete = async (input: { forTxHash: string } | { forTxId: string }) => {
  while (true) {
    const response = await hasTxBeenIndexed(input);

    if (!response) {
      break;
    }

    console.log('pool until indexed: result', response);

    switch (response.status) {
      case DiGiTransactionStatusType.Failed:
        throw new Error(response.reason ?? 'Transaction failed');

      case DiGiTransactionStatusType.Processing:
        console.log('still in progress');
        break;

      case DiGiTransactionStatusType.Complete:
        console.log('complete and indexed onchain');
        return response;
    }

    console.log('pool until indexed: sleep for 1500 milliseconds then try again');
    // sleep for before trying again
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
};

(async () => {
  if (explicitStart(__filename)) {
    //await testTransaction();
  }
})();
