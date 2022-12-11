import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";
import { CustomButton, PageHOC } from "../components";
import styles from "../styles";
import { useTranslation } from "react-i18next";
import { Translation } from "react-i18next";

const JoinBattle = () => {
  const navigate = useNavigate();
  const {
    contract,
    gameData,
    setShowAlert,
    setBattleName,
    setErrorMessage,
    walletAddress,
  } = useGlobalContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1)
      navigate(`/battle/${gameData.activeBattle.name}`);
  }, [gameData]);

  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      await contract.joinBattle(battleName);

      setShowAlert({
        status: true,
        type: "success",
        message: `Joining ${battleName}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <h2 className={styles.joinHeadText}>{t("join_available_battle")}</h2>

      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length ? (
          gameData.pendingBattles
            .filter(
              (battle) =>
                !battle.players.includes(walletAddress) &&
                battle.battleStatus !== 1
            )
            .map((battle, index) => (
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={styles.joinBattleTitle}>
                  {index + 1}. {battle.name}
                </p>
                <CustomButton
                  title={t("join_join")} //"Join"
                  handleClick={() => handleClick(battle.name)}
                />
              </div>
            ))
        ) : (
          <p className={styles.joinLoading}>{t("join_reload")}</p>
        )}
      </div>

      <p className={styles.infoText} onClick={() => navigate("/create-battle")}>
        {t("join_or_create_new_battle")}
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <Translation>{(t, { i18n }) => <p>{t("join_battle")}</p>}</Translation>,
  <Translation>
    {(t, { i18n }) => <p>{t("join_existing_battle")}</p>}
  </Translation>
);
