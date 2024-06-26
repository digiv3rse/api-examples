import { apolloClient } from '../apollo-client';
import { login } from '../authentication/login';
import { explicitStart } from '../config';
import { getAddressFromSigner } from '../ethers.service';
import { UnfollowDocument, UnfollowRequest } from '../graphql/generated';
import { knownProfileId } from '../known-common-input-constants';
import { waitUntilDiGiManagerTransactionIsComplete } from '../transaction/wait-until-complete';

const unfollow = async (request: UnfollowRequest) => {
  const result = await apolloClient.mutate({
    mutation: UnfollowDocument,
    variables: {
      request,
    },
  });

  return result.data!.unfollow;
};

export const followDiGiProfileManager = async (profileId: string = knownProfileId) => {
  const address = getAddressFromSigner();
  console.log('unfollow digi profile manager: address', address);

  await login(address);

  const result = await unfollow({
    unfollow: [profileId],
  });
  console.log('unfollow digi profile manager: result', result);
  await waitUntilDiGiManagerTransactionIsComplete(result, 'unfollow');
};

(async () => {
  if (explicitStart(__filename)) {
    await followDiGiProfileManager();
  }
})();
