import { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import Quagga from "quagga";
import { QRCodeCanvas } from "qrcode.react";
import JsBarcode from "jsbarcode";

export default function CardsPage() {
    const [codeData, setCodeData] = useState(null);
    const [codeType, setCodeType] = useState(null);
    const barcodeRef = useRef(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            let foundCode = false;

            // 🟢 1. Поиск QR-кода
            const qrCode = jsQR(imageData.data, img.width, img.height);
            if (qrCode) {
                setCodeData(qrCode.data);
                setCodeType("qr");
                foundCode = true;
            }

            // 🔵 2. Поиск штрих-кода с помощью Quagga
            if (!foundCode) {
                Quagga.decodeSingle(
                    {
                        src: canvas.toDataURL(), // Используем изображение из Canvas
                        numOfWorkers: 0, // Работает в основном потоке
                        inputStream: {
                            size: 800, // Размер изображения (чем больше, тем точнее)
                        },
                        decoder: {
                            readers: ["ean_reader", "code_128_reader", "upc_reader"], // Поддерживаемые форматы штрих-кодов
                        },
                    },
                    (result) => {
                        if (result && result.codeResult) {
                            setCodeData(result.codeResult.code);
                            setCodeType("barcode");
                        } else {
                            setCodeData(null);
                            setCodeType(null);
                            alert("Код не найден!");
                        }
                    }
                );
            }
        };
    };

    // 📌 Отрисовка штрих-кода
    useEffect(() => {
        if (codeType === "barcode" && barcodeRef.current) {
            JsBarcode(barcodeRef.current, codeData, {
                format: "CODE128",
                displayValue: true,
                fontSize: 18,
                lineColor: "#fff",
                background: "transparent",
                width: 2,
                height: 80,
            });
        }
    }, [codeData, codeType]);

    return (
        <div style={{ padding: "20px", color: "#fff" }}>
            <h2>Бонусные карты</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginBottom: "20px" }} />

            {codeData && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <h3>Распознанный код:</h3>
                    <p style={{ fontSize: "18px", fontWeight: "bold" }}>{codeData}</p>

                    <div
                        style={{
                            background: "#fff",
                            padding: 20,
                            display: "inline-block",
                            borderRadius: "8px",
                        }}
                    >
                        {codeType === "qr" ? (
                            <QRCodeCanvas value={codeData} size={200} />
                        ) : (
                            <canvas ref={barcodeRef}></canvas>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
