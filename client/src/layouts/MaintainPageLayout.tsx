import React from 'react';

interface MaintainPageLayoutProps {
  backgroundImage: string;
  editMode: boolean;
  filter: React.ReactNode;
  commands: React.ReactNode;
  listPanel: React.ReactNode;
  editPanel?: React.ReactNode;
}

const MaintainPageLayout: React.FC<MaintainPageLayoutProps> = ({
  backgroundImage,
  editMode,
  filter,
  commands,
  listPanel,
  editPanel,
}) => {
  return (
    <div
      className="min-h-screen bg-gray-100 font-inter text-gray-800 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="min-h-screen bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <header className="w-full bg-blue-800 text-white p-4 shadow-xl rounded-b-lg mb-4">
          <h1 className="text-4xl font-extrabold text-center drop-shadow-lg">TITLE TO BE DONE</h1>
        </header>

        <div className="p-4 max-w-7xl mx-auto rounded-xl bg-white bg-opacity-90 shadow-2xl space-y-4">
          {/* Filter always on top */}
          {filter}

          {/* Main content: list/edit + commands */}
          <div className="flex flex-col md:flex-row gap-6">
            
            <div className="flex-1">
              {editMode ? editPanel : listPanel}
            </div>
            <div className="w-full md:w-1/3">
              {commands}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintainPageLayout;
