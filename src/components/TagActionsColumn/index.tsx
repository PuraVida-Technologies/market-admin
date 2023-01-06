import styles from "./styles.module.scss";
import { EditTwoTone } from "@ant-design/icons";

const TagActionsColumn = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return (
    <div className={styles.noBreak}>
      <a className={styles.actionLink}>
        <EditTwoTone onClick={onClick} />
      </a>
    </div>
  );
};

export default TagActionsColumn;
