import { apolloClient } from '../apollo-client';
import { login } from '../authentication/login';
import { explicitStart } from '../config';
import { getAddressFromSigner } from '../ethers.service';
import { LinkHandleToProfileDocument, LinkHandleToProfileRequest } from '../graphql/generated';
import { waitUntilDiGiManagerTransactionIsComplete } from '../transaction/wait-until-complete';

const linkHandleToProfile = async (request: LinkHandleToProfileRequest) => {
  const result = await apolloClient.mutate({
    mutation: LinkHandleToProfileDocument,
    variables: {
      request,
    },
  });

  return result.data!.linkHandleToProfile;
};

export const linkHandleToProfileProfileManager = async () => {
  const address = getAddressFromSigner();
  console.log('link handle to profile: digi profile manager: address', address);

  await login(address);

  const result = await linkHandleToProfile({
    handle: 'test/wagmi',
  });
  console.log('link handle to profile: digi profile manager: result', result);
  await waitUntilDiGiManagerTransactionIsComplete(result, 'unlinkHandleFromProfile');
};

(async () => {
  if (explicitStart(__filename)) {
    await linkHandleToProfileProfileManager();
  }
})();
