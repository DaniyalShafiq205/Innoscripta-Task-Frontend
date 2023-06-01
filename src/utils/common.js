import instanceAxios from "../http/axios";

export const fetchUserDetail = async () => {
  try {
    const { user } = await instanceAxios.get("/me");
    return user;
  } catch (error) {}
};

export const fetchPreferences = async () => {
  try {
    const response = await instanceAxios.get("/preferences");
    return response;
  } catch (error) {}
};

export const formatPreferencesList = (list) => {
  return list.map((item) => {
    return {
      id: item.id,
      label: item.name,
      value: item.name.toLowerCase().replace(/\s/g, "-"),
    };
  });
};
