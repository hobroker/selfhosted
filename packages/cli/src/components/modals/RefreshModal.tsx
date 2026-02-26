import { useEffect } from "react";
import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useFocusManagerContext } from "../../contexts/FocusManagerContext";

export const RefreshModal = () => {
  const { refreshServices } = useServicesContext();
  const { closeModals } = useFocusManagerContext();

  useEffect(() => {
    let mounted = true;
    refreshServices().then(() => {
      if (mounted) closeModals();
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal id="refresh" title="Refresh" width="40%" minWidth={50}>
      <Text color={colors.warning}>Refreshing all services...</Text>
    </Modal>
  );
};
