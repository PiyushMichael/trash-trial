import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import Fb from 'components/fb';
import Insta from 'components/insta';
import Landing from 'components/landing';

const TabNavigator = createMaterialTopTabNavigator ({
    Landing: Landing,
    Instagram: Insta,
    Facebook: Fb,
}, {
    swipeEnabled: true,
});

export default createAppContainer(TabNavigator);
