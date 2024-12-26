import PersistentBottomSheet from "../components/PersistentBottomSheet";


const ExampleApp = () => {
    return (
      <div className="h-screen bg-gray-100">
        {/* Your main content here */}
        <div className="p-4">
          <h1 className="text-xl font-bold">Main Content</h1>
          <p>This content remains interactive when the bottom sheet is open</p>
          <button onClick={() => console.log("holaaaaa ivo")}>Hola</button>
        </div>
        
        <PersistentBottomSheet>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Bottom Sheet Content</h2>
            <p>This is the content of your bottom sheet.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Action Button
            </button>
          </div>
        </PersistentBottomSheet>
      </div>
    );
  };

export default ExampleApp;