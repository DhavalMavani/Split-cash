import { create } from 'zustand'; 
import apiHelper from '../helper/apiHelper';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGroupActivitiesStore = create(
    persist(
        (set) => ({
            activitiesHash: {},
            setActivitiesHash: (groupId, activities) => {
                set((state) => ({
                    activitiesHash: {
                        ...state.activitiesHash,
                        [groupId]: activities,
                    },
                }));
            },
            getActivities: (groupId) => {
              const { activitiesHash } = useGroupActivitiesStore.getState();
                return activitiesHash[groupId] || [];
            },
        }),
        {
            name: 'groupActivities',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

const useGroupActivities = (groupId) => {
    const { setActivitiesHash, getActivities } = useGroupActivitiesStore();
    const activities = getActivities(groupId);

    const setActivities = (newActivities) => {
        setActivitiesHash(groupId, newActivities);
    };

    return { activities, setActivities };
};

export default useGroupActivities;