import { StatusBar } from 'expo-status-bar';
import { withNavigation } from './src/app/providers/with-navigation';

function App() {
  return (
    <>
      <StatusBar style="auto" />
    </>
  );
}

export default withNavigation(App);