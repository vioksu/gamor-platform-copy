import NavigationOptions from "../components/NavigationOptions";

export default function SearchGameDefault() {
  return (
    <div>
      <div className="light-menu">
        <NavigationOptions menu='search' />
      </div>
      <p id="zero-state">
        This is a Gamor Streaming Platform.
      </p>
    </div>
  );
}
