import { BgCodeGenClassConfig } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const companyInput: BgCodeGenClassConfig = {
  name: 'CompanyInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: '../mm-backend-core/src/services/accounts/types/classes/CompanyInput.ts',
  active: true,
  attributes: [
    { name: 'name', dataType: 'string' },
    { name: 'website', dataType: 'string', optional: true },
    { name: 'industries', dataType: 'Industry[]', optional: true },
    { name: 'isOperational', dataType: 'boolean', optional: true },
    { name: 'isFundraising', dataType: 'boolean', optional: true },
    { name: 'annualRevenue', dataType: 'integer', optional: true },
    { name: 'employeeCount', dataType: 'integer', optional: true },
  ]
}

export default companyInput
