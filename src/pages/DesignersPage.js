import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../components/SpaceComponent";

import { useGetAllDesignersQuery } from "../data/designersSlice";
import DesignersCard from "../components/DesignersCard";
import { useLocalStorage } from "../context/LocalStorageContext";

const DesignersPage = () => {
  const { t, i18n } = useTranslation();
  const { localStorageData, syncLocalStorageData } = useLocalStorage();

  const { data, isLoading, error } = useGetAllDesignersQuery();
  const [activeDesigners, setActiveDesigners] = useState([]);

  useEffect(() => {
    setActiveDesigners(data?.filter((item) => item.activeStatus));
  }, [data]);

  useEffect(() => {
    if (activeDesigners && activeDesigners.length > 0) {
      syncLocalStorageData("allDesigners", activeDesigners);
    }
  }, [data, activeDesigners]);

  return (
    <div className="w-full designers-page flex flex-col items-center">
      <div className="space-component-container w-full">
        <SpaceComponent data={{ data: t("designers") }} />
      </div>
      <div className="designers-page-inner-container pt-10 pb-5 lg:pb-0">
        <div className="designers-cards-container w-full flex flex-wrap justify-evenly gap-x-[30px] gap-y-[15px] lmd:gap-y-[20px]">
          {localStorageData.allDesigners &&
            localStorageData.allDesigners.map((el, i) => <DesignersCard key={i} data={el} />)}
        </div>
      </div>
    </div>
  );
};

export default DesignersPage;
