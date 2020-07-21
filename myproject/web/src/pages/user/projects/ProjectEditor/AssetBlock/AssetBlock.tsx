import React from 'react';
import { Upload, Icon, notification } from 'antd';
import storage from '../../../../../lib/webStorage';
import { TypeProjectAssets } from '../../../../../store/reducers/project.reducer';

const { Dragger } = Upload;
const { accessToken } =
  (storage.getItem('authinfo') && storage.getItem('authinfo')) || {};
interface Props {
  id: number;
  projectAssets: Array<TypeProjectAssets>;
  getProjectAssets: (projectId) => void;
}
const AssetBlock: React.FC<Props> = ({
  id,
  projectAssets,
  getProjectAssets
}) => {
  const props = {
    name: 'file',
    accept: '.jpg,.gif,.png,.csv',
    multiple: true,
    action: `/user/projects/${id}/assets`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    showUploadList: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        getProjectAssets({ projectId: id });
        notification['info']({
          message: `${info.file.name}をアップロードしました。`,
          duration: 5
        });
      } else if (status === 'error') {
        notification['error']({
          message: `${info.file.name} file upload failed.`,
          duration: 5
        });
      }
    }
  };
  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <ul>
        {projectAssets.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssetBlock;
