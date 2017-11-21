import { StackNavigator, NavigationActions } from 'react-navigation';

let NavigationRef = {

    //reset stack and navigate to Inventory
    navigateToInventory() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Inventory', params: {}, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    },

    //reset stack and navigate to Recipes
    navigateToRecipes() { 
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Recipes', params: { input: "", redirectToPlanner: "" }, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    },

    //reset stack and navigate to Planner
    navigateToPlanner() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Planner', params: { item: "" }, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    },

    //reset stack and navigate to Settings
    navigateToSettings() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Settings', params: {}, })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    },

}

export default NavigationRef;