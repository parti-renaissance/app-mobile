import RegionTheme from '../../core/entities/RegionTheme'

export const ThemeMapper = {
  map: (themeName: string): RegionTheme => {
    switch (themeName) {
      case 'blue':
        return RegionTheme.BLUE
      case 'green':
        return RegionTheme.GREEN
      case 'orange':
        return RegionTheme.ORANGE
      case 'pink':
        return RegionTheme.PINK
      case 'purple':
        return RegionTheme.PURPLE
      case 'red':
        return RegionTheme.RED
      case 'yellow':
        return RegionTheme.YELLOW
    }
    return RegionTheme.BLUE
  },
  id: (theme: RegionTheme): string => {
    switch (theme) {
      case RegionTheme.BLUE:
        return 'blue'
      case RegionTheme.GREEN:
        return 'green'
      case RegionTheme.ORANGE:
        return 'orange'
      case RegionTheme.PINK:
        return 'pink'
      case RegionTheme.PURPLE:
        return 'purple'
      case RegionTheme.RED:
        return 'red'
      case RegionTheme.YELLOW:
        return 'yellow'
    }
  },
}
