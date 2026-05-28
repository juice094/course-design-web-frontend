import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

// 定义要下载的校园风景图片列表
const sceneryImages = [
    {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=85',
        filename: 'scenery_1.jpg',
        description: '大学校园建筑'
    },
    {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=85',
        filename: 'scenery_2.jpg',
        description: '校园春色'
    },
    {
        url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=85',
        filename: 'scenery_3.jpg',
        description: '学术殿堂'
    },
    {
        url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=85',
        filename: 'scenery_4.jpg',
        description: '校园运动场'
    },
    {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=85',
        filename: 'scenery_5.jpg',
        description: '校园广场'
    },
    {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=85',
        filename: 'scenery_6.jpg',
        description: '学生活动中心'
    }
];

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

// 主函数
async function main() {
    console.log('========================================');
    console.log('开始下载校园风景图片');
    console.log('========================================\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const image of sceneryImages) {
        const filepath = path.join(imagesDir, image.filename);
        
        try {
            await downloadImage(image.url, filepath, image.description);
            successCount++;
        } catch (error) {
            console.error(`✗ 失败: ${image.description} - ${error.message}`);
            failCount++;
        }
        
        // 添加延迟避免请求过快
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n========================================');
    console.log(`下载完成！成功: ${successCount}, 失败: ${failCount}`);
    console.log('========================================');
}

main().catch(console.error);
