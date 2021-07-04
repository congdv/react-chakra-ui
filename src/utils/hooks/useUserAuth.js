import { useEffect } from "react";
import { isUserLoaded, fetchUser } from "stores/account";
import { useSelector, useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const userLoaded = useSelector(isUserLoaded);

  useEffect(() => {
    if (!userLoaded) {
      dispatch(fetchUser());
    }
  }, [dispatch, userLoaded]);
  return userLoaded;
};
