// https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
import { NavigationActions } from 'react-navigation'

let _navigator

export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef
}

export const navigate = (routeName, params = {}) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}
