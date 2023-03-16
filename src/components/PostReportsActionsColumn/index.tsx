import styles from "./styles.module.scss";
import { DeleteTwoTone, DislikeOutlined } from "@ant-design/icons";

const PostReportsActionsColumn = ({
  ignoreReportClick,
  deletePostClick,
}: {
  ignoreReportClick: () => void;
  deletePostClick: () => void;
}): JSX.Element => {
  return (
    <div className={styles.noBreak}>
      <a className={styles.actionLink}>
        <DislikeOutlined onClick={ignoreReportClick} title="Ignore Report" />
      </a>
      |
      <a className={styles.actionLink}>
        <DeleteTwoTone onClick={deletePostClick} title="Remove Post" />
      </a>
    </div>
  );
};

export default PostReportsActionsColumn;
