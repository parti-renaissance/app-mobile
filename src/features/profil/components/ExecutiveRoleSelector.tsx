import SelectV3 from '@/components/base/Select/SelectV3'
import Text from '@/components/base/Text'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetExecutiveScopes, useMutateExecutiveScope } from '@/services/profile/hook'

export default function ExecutiveRoleSelector() {
  const { data: scopes } = useGetExecutiveScopes()
  const { mutate: mutateScope } = useMutateExecutiveScope()

  const formatedScopes = scopes?.list.map((scope) => ({
    label: `${scope.name}`,
    subLabel: scope.zones.map(({ name, code }) => `${name} (${code})`).join(', '),
    value: scope.code,
  }))

  const handleChange = (value: string) => {
    mutateScope({ scope: value })
  }

  return (
    <VoxCard backgroundColor="$purple1">
      <VoxCard.Content>
        <Text.MD semibold textAlign="center" color="$purple6">
          Changer de rôle actif
        </Text.MD>
        <SelectV3 color="purple" size="xl" options={formatedScopes} multiline onChange={handleChange} value={scopes.default.code} />
      </VoxCard.Content>
    </VoxCard>
  )
}
