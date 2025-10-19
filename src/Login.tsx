import { useState, useEffect } from "react";

interface UserData {
  name: string;
  code: string;
  link: string;
}

const Login = () => {
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [sheetData, setSheetData] = useState<UserData[]>([]);

  // استبدل هذا الرابط بالرابط الذي حصلت عليه بعد نشر الورقة كـ CSV
  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIPcoIiuwIfDEN2yqbjNz_JccoMemFH4OJphiVLPKrub6qYkXTbLl9klmYZyPHYJjkWw576iz1keZV/pub?gid=47240984&single=true&output=csv";

  useEffect(() => {
    fetch(sheetUrl)
      .then((response) => response.text())
      .then((csvData) => {
        // تحويل CSV إلى مصفوفة من البيانات
        const rows = csvData.split("\n").map((row) => row.split(","));
        const userData = rows.map((cols) => ({
          name: cols[0].trim(),
          code: cols[1].trim(),
          link: cols[2].trim(),
        }));
        setSheetData(userData); // تخزين البيانات
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleLogin = () => {
    const user = sheetData.find(
      (user) => user.name === name && user.code === code
    );

    if (user) {
      setLink(user.link); // تحديد الرابط
      setError(""); // إزالة الخطأ

      // فتح الرابط في نفس النافذة بعد التحقق
      window.location.href = user.link;
    } else {
      setError("الاسم أو الكود غير صحيح");
      setLink(""); // إعادة تعيين الرابط في حال الخطأ
    }
  };

  return (
    <div className="login-container">
      <h3> temeyouzi - منصة</h3>
      <h2> تسجيل الدخول</h2>
      <div>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="كلمة المرور"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>تسجيل الدخول</button>
      {error && <p className="error">{error}</p>}
      {link && (
        <div>
          <p>تم التحقق بنجاح، مرحبا بكم في منصة تميزي العليمية     ...</p>
        </div>
      )}
    </div>
  );
};

export default Login;
