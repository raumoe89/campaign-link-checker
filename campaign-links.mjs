const requiredTags = ['utm_source', 'utm_medium', 'utm_campaign'];
const tagFormat = /^[a-z0-9][a-z0-9._-]*$/;

export function inspectCampaignLink(input) {
  const address = input.trim();
  let url;
  try {
    url = new URL(address);
  } catch {
    return { host: '', errors: ['Enter a full HTTPS URL.'] };
  }

  if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) {
    return { host: url.hostname, errors: ['Use an HTTPS URL without embedded credentials.'] };
  }

  const errors = [];
  for (const tag of requiredTags) {
    const values = url.searchParams.getAll(tag);
    if (values.length !== 1) {
      errors.push(values.length ? `Use ${tag} once.` : `Add ${tag}.`);
    } else if (!tagFormat.test(values[0])) {
      errors.push(`Use a lowercase, nonempty value without spaces for ${tag}.`);
    }
  }

  return { host: url.hostname, errors };
}
