import { apolloClient } from '../apollo-client';
import { login } from '../authentication/login';
import { explicitStart } from '../config';
import { getAddressFromSigner } from '../ethers.service';
import { BlockDocument, BlockRequest } from '../graphql/generated';
import { knownProfileId } from '../known-common-input-constants';
import { waitUntilDiGiManagerTransactionIsComplete } from '../transaction/wait-until-complete';

const block = async (request: BlockRequest) => {
  const result = await apolloClient.mutate({
    mutation: BlockDocument,
    variables: {
      request,
    },
  });

  return result.data!.block;
};

export const blockDiGiProfileManager = async (profileId: string = knownProfileId) => {
  const address = getAddressFromSigner();
  console.log('block digi profile manager: address', address);

  await login(address);

  const result = await block({
    profiles: [profileId],
  });
  console.log('block digi profile manager: result', result);
  await waitUntilDiGiManagerTransactionIsComplete(result, 'block');
};

(async () => {
  if (explicitStart(__filename)) {
    await blockDiGiProfileManager();
  }
})();
