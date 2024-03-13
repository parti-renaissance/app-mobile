import React from 'react'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import { ROUTES } from 'app/routes'
import { Link, usePathname } from 'expo-router'
import { Avatar, Button, Stack, styled, Text, useMedia, View } from 'tamagui'
import ButtonCustom from '../Button'

const opacityToHexCode = (hex: string, opacity: number) => {
  const opacityHex = Math.round(opacity * 255).toString(16)
  return `${hex}${opacityHex}`
}

const ButtonNav = styled(Button, {
  backgroundColor: 'transparent',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
})

const NavBar: React.FC = () => {
  const pathname = usePathname()
  const media = useMedia()

  const { data: profile } = useGetProfilObserver()

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="white"
      borderBottomWidth={2}
      borderBottomColor="rgba(145, 158, 171, 0.32)"
      height={82}
      paddingHorizontal={'$4'}
    >
      <Link href={'/home' as never}>
        <EuCampaignIllustration />
      </Link>

      {profile && (
        <Stack flexDirection="row" gap={4}>
          {ROUTES.map((route) => {
            const focused = pathname.replace('/', '') === route.name
            const colorOpacity = opacityToHexCode(route.gradiant[0], 0.09)
            const Icon = () => <route.icon size={28} color={focused ? route.gradiant[1] : '#637381'} />

            return (
              <Link
                key={route.name}
                href={`/(tabs)/${route.name}`}
                onPress={() => {
                  Analytics.logNavBarItemSelected(route.screenName as AnalyticsScreens)
                }}
              >
                <ButtonNav
                  hoverStyle={{
                    backgroundColor: !focused ? colorOpacity : 'transparent',
                    borderColor: 'transparent',
                  }}
                  pressStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                >
                  <Button.Icon scaleIcon={2}>
                    <Icon />
                  </Button.Icon>

                  {media.gtMd && (
                    <Button.Text color={focused ? route.gradiant[1] : 'gray8'} fontWeight={'500'}>
                      {route.screenName}
                    </Button.Text>
                  )}
                </ButtonNav>
              </Link>
            )
          })}
        </Stack>
      )}

      <View flexDirection="row" gap={'$4'} justifyContent="space-between" alignItems="center">
        {profile ? (
          <>
            <Stack gap={4} flexDirection="column" alignContent="flex-end" alignItems="flex-end">
              <Text fontFamily={'$PublicSans'} color={'gray8'} fontWeight={'500'}>
                {profile?.first_name} {profile?.last_name}
              </Text>

              {/* TODO: add the personal code */}
              <Text fontFamily={'$PublicSans'} fontSize={12} color={'$gray5'}>
                #000000
              </Text>
            </Stack>

            <Avatar circular size="$4">
              {/* TODO: add the real avatar*/}
              <Avatar.Image source={{ uri: 'https://picsum.photos/200/200', width: 200, height: 200 }} />
              <Avatar.Fallback bc="$gray3" />
            </Avatar>
          </>
        ) : (
          <>
            <Stack gap={'$2'} flexDirection="row">
              <ButtonCustom variant="text" height={'$3'}>
                <ButtonCustom.Text color={'gray8'} fontWeight={'800'}>
                  Me connecter
                </ButtonCustom.Text>
              </ButtonCustom>

              <ButtonCustom backgroundColor={'$blue6'} height={'$3'} borderRadius={'$3'} padding={'$3'}>
                <ButtonCustom.Text color={'white'} fontWeight={'800'}>
                  J'adhère
                </ButtonCustom.Text>
              </ButtonCustom>
            </Stack>
          </>
        )}
      </View>
    </Stack>
  )
}

export default NavBar
