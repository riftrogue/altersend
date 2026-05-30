import { NativeTabs } from 'expo-router/unstable-native-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@altersend/components'

export default function TabLayout() {
  const { theme } = useTheme()
  const c = theme.colors
  return (
    <NativeTabs
      tintColor={c.colorInfo}
      iconColor={{ default: c.colorTextSecondary, selected: c.colorInfo }}
      labelStyle={{
        default: { color: c.colorTextSecondary },
        selected: { color: c.colorInfo }
      }}
      indicatorColor={c.colorBackground}
      blurEffect='systemChromeMaterialDark'
      backgroundColor={c.colorBackground}
      shadowColor={c.colorBorderStrong}
      disableTransparentOnScrollEdge
    >
      <NativeTabs.Trigger name='send/index'>
        <NativeTabs.Trigger.Icon
          sf='paperplane.fill'
          src={<NativeTabs.Trigger.VectorIcon family={Ionicons} name='paper-plane' />}
        />
        <NativeTabs.Trigger.Label>Send</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='receive/index'>
        <NativeTabs.Trigger.Icon
          sf='square.and.arrow.down'
          src={<NativeTabs.Trigger.VectorIcon family={Ionicons} name='download' />}
        />
        <NativeTabs.Trigger.Label>Receive</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
