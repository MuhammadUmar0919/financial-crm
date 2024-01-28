// @casl import
import {
  AbilityBuilder,
  Ability
} from '@casl/ability';

export const AppAbility = Ability;
const defineRulesFor = (role, data) => {
  const { can, rules } = new AbilityBuilder(AppAbility);
  if (role === "super-admin") {
    can('manage', 'all')
  } else {
    data.forEach((item) => {
      can([...item.actions], item.subject);
    })
  }
  return rules;
};

export const buildAbilityFor = (role, data) => {
  return new AppAbility(defineRulesFor(role, data), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object.type,
  });
};

export const defaultACLObj = {
  action: 'manage',
  subject: 'all',
};

export default defineRulesFor;