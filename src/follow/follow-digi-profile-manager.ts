import { apolloClient } from '../apollo-client';
import { login } from '../authentication/login';
import { explicitStart } from '../config';
import { getAddressFromSigner } from '../ethers.service';
import { FollowDocument, FollowDiGiManagerRequest } from '../graphql/generated';
import { knownProfileId } from '../known-common-input-constants';
import { waitUntilDiGiManagerTransactionIsComplete } from '../transaction/wait-until-complete';

const follow = async (request: FollowDiGiManagerRequest) => {
  const result = await apolloClient.mutate({
    mutation: FollowDocument,
    variables: {
      request,
    },
  });

  return result.data!.follow;
};

export const followDiGiProfileManager = async (profileId: string = knownProfileId) => {
  const address = getAddressFromSigner();
  console.log('follow digi profile manager: address', address);

  await login(address);

  const result = await follow({
    follow: [
      {
        profileId: profileId,
      },
    ],
  });
  console.log('follow digi profile manager: result', result);
  await waitUntilDiGiManagerTransactionIsComplete(result, 'follow');
};

(async () => {
  if (explicitStart(__filename)) {
    await followDiGiProfileManager();
  }
})();
