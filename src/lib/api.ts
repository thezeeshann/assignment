import axios from "axios";
import { useEffect, useState } from "react";
import { UserData } from "./type";

export function useUserData() {
  const [userData, setUserData] = useState<UserData>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e"
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("API ERROR FETCHING USER DATA ", error);
      }
    };

    getUserData();
  }, []);

  return {
    userData,
    setUserData,
  };
}
