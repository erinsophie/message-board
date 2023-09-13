function Error({ error }) {
  return (
    <div className="flex-1">
      <p>{`Error: ${error}`}</p>
    </div>
  );
}

export default Error;
