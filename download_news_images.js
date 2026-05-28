import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

// 定义要下载的新闻图片列表
const newsImages = [
    {
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&q=85',
        filename: 'news_1.jpg',
        description: '高校交流调研'
    },
    {
        url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=85',
        filename: 'news_2.jpg',
        description: '战略合作签约'
    },
    {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85',
        filename: 'news_3.jpg',
        description: '技术开发大赛'
    },
    {
        url: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&q=85',
        filename: 'news_4.jpg',
        description: 'AI教育白皮书'
    },
    {
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85',
        filename: 'news_5.jpg',
        description: '教学研讨会'
    }
];

// 确保 images 目录存在
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('创建 images 目录');
}

// 下载单个图片的函数
function downloadImage(url, filepath, description) {
    return new Promise((resolve, reject) => {
        console.log(`正在下载: ${description}...`);
        
        const file = fs.createWriteStream(filepath);
        
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`下载失败: ${response.statusCode}`));
                return;
            }
            
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                console.log(`✓ 完成: ${description}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

// 主函数 - 依次下载所有图片
async function main() {
    console.log('========================================');
    console.log('开始下载焦点新闻图片');
    console.log('========================================\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const image of newsImages) {
        const filepath = path.join(imagesDir, image.filename);
        
        try {
            await downloadImage(image.url, filepath, image.description);
            successCount++;
        } catch (error) {
            console.error(`✗ 失败: ${image.description} - ${error.message}`);
            failCount++;
        }
        
        // 避免请求过快，间隔500毫秒
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n========================================');
    console.log(`下载完成！成功: ${successCount}, 失败: ${failCount}`);
    console.log('========================================');
    
    if (failCount > 0) {
        console.log('\n提示: 部分图片下载失败，可以重新运行脚本');
    }
}

main().catch(console.error);
