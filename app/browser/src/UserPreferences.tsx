/**
 * Provides get/set access to user UI preferences
 * via a React context.
 */
import React, { Dispatch, SetStateAction, useCallback, useState, useEffect } from "react";
import {
  useGetUserPreferencesQuery,
  useUpdateUserPreferenceMutation,
  UpdateUserPreferenceMutationFn,
} from "./graphql/generated/types";

/* for extra context: key = "<Route><Pref>"" */
export enum UserPreferenceEnum {
  SomeKey = "SomeKey",
}

type UserPreferenceKeys = keyof typeof UserPreferenceEnum;
type EnumKeyFields = { [key in UserPreferenceKeys]: any };

type Props = {
  children: React.ReactNode;
};

export interface PreferencesObject {
  preferences: EnumKeyFields | undefined;
  update: UpdateUserPreferenceMutationFn | undefined;
}

const defaultPreferencesObject: PreferencesObject = {
  preferences: undefined,
  update: undefined,
};

export const UserPreferencesContext = React.createContext<PreferencesObject>(
  defaultPreferencesObject
);

export const PreferencesProvider = ({ children }: Props) => {
  const [prefsObject, setprefsObject] = useState<PreferencesObject>(
    defaultPreferencesObject
  );

  // get an update function
  const [updateUserPreferenceMutation] = useUpdateUserPreferenceMutation({
    refetchQueries: () => ["GetUserPreferences"],
  });

  // get the actual prefs from the db
  const prefsQueryResult = useGetUserPreferencesQuery();

  // update on changes to updateUserPreferenceMutation
  useEffect(() => {
    const preferences = {} as EnumKeyFields;
    if (prefsQueryResult.data) {
      prefsQueryResult.data.users_preferences.forEach((pref) => {
        // cast the key as an Enum
        preferences[pref.key as UserPreferenceEnum] = pref.value;
      });
    }
    const updatedPrefs: PreferencesObject = {
      update: updateUserPreferenceMutation,
      preferences,
    };
    setprefsObject(updatedPrefs);
  }, [prefsQueryResult.data, updateUserPreferenceMutation]);

  return (
    <UserPreferencesContext.Provider value={prefsObject}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  return React.useContext(UserPreferencesContext);
};

/**
 * Main exported hook. Supply a preference key and an initial value (or undefined), and it will return the current assigned value OR
 * the value in the db IF not the default value. On update, the db preference value also gets updated,
 * (but doesn't trigger an update to the local value, otherwise clobbering and timing issues abound).
 * Use as in:
 *    const [pattern, setPattern] = usePreferencesValue<string | undefined>(UserPreferenceEnum.SomeKey, undefined);
 * @param key
 * @param initialValue
 */
export const usePreferencesValue = function <T>(
  key: UserPreferenceEnum,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const userPreferences = usePreferences();
  const [value, setValueLocal] = useState<T>(defaultValue);

  // even though it's another local variable, it's much much easier figure out if this is the
  // first time the db is updating this value if we record it explicitly
  const [firstUpdateFromDB, setFirstUpdateFromDB] = useState<boolean>(false);

  // ensure "value" is the value from the db if this is the first time we get the
  // prefs from the db
  useEffect(() => {
    if (
      userPreferences.preferences &&
      userPreferences.preferences[key] !== undefined &&
      !firstUpdateFromDB
    ) {
      setFirstUpdateFromDB(true);
      setValueLocal(userPreferences.preferences[key]);
    }
  }, [key, userPreferences, firstUpdateFromDB]);

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (newVal: SetStateAction<T>) => {
      setValueLocal(newVal);
      if (userPreferences.update) {
        const options = {
          variables: { key: UserPreferenceEnum[key], value: newVal },
        };
        userPreferences.update(options).catch((e) => console.error(e));
      }
    },
    [key, setValueLocal, userPreferences]
  );

  return [value, setValue];
};
