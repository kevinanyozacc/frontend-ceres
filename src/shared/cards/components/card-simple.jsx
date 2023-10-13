export default function CardSimple({ children, className }) {
  return (
    <div
      className={`card AnimalProfile__place_data AnimalProfile__place_data--2 CardSimple${className}`}>
      <div className="AnimalProfile__extra_data">{children || null}</div>
    </div>
  );
}
