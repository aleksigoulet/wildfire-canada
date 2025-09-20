import { render, act, waitFor, userEvent, fireEvent } from "@testing-library/react-native";
import Prepare from "@/app/(tabs)/prepare";
import { red } from "react-native-reanimated/lib/typescript/Colors";
// import ChecklistContextProvider from "@/context/ChecklistContextProvider";

// tests below adapted from following youtube video
// https://www.youtube.com/watch?v=VuNPrFH9H0E
describe('Prepare View', () => {
  it('renders correctly', async () => {
    const { getByText, getByTestId, getAllByTestId } = render( <Prepare /> );

    getByText('Remaining Tasks');
    getByTestId('Prepare.ProfileHeader');
    expect(getAllByTestId('Prepare.ChecklistButton').length).toBe(3);
  });
})
